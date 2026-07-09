'use client'

import { Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { useComments } from '@/app/hooks/useComments'
import { useCreateComment } from '@/app/hooks/useCreateComment'
import { useDeleteComment } from '@/app/hooks/useDeleteComment'
import { useUpdateComment } from '@/app/hooks/useUpdateComment'
import { formattedDate } from '@/lib/formattedDate/formattedDate'
import type { Comment, Paginated } from '@/types/blog'

type CommentsSectionProps = {
  initialComments: Paginated<Comment>
  postId: string
  user: { id: string; name: string; email: string } | null
}

export function CommentsSection({ initialComments, postId, user }: CommentsSectionProps) {
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const createComment = useCreateComment(postId)
  const { data: comments } = useComments(postId, initialComments)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    createComment.mutate(content, {
      onSuccess: () => setContent(''),
    })
  }

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva um comentário..."
            className="w-full border border-border rounded-lg p-3 text-ink"
            rows={3}
          />
          <button
            type="submit"
            disabled={createComment.isPending}
            className="mt-2 bg-accent text-ink font-bold px-4 py-2 rounded"
          >
            {createComment.isPending ? 'Enviando...' : 'Comentar'}
          </button>
          {createComment.isError && (
            <p className="text-red-600 text-sm mt-1">Erro ao comentar. Tente novamente.</p>
          )}
        </form>
      ) : (
        <p className="text-ink/60 mb-8">Faça login para comentar.</p>
      )}

      {comments.items.length < 1 ? (
        <p className="font-sans font-bold text-ink">Nenhum comentário.</p>
      ) : (
        <>
          <p className="font-sans font-bold text-ink">{comments.items.length} comentários</p>
          {comments.items.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              isOwner={user?.id === comment.author.id}
              isEditing={editingId === comment.id}
              editContent={editContent}
              onStartEdit={() => {
                setEditingId(comment.id)
                setEditContent(comment.content)
              }}
              onCancelEdit={() => setEditingId(null)}
              onChangeEdit={setEditContent}
              onFinishEdit={() => setEditingId(null)}
            />
          ))}
        </>
      )}
    </div>
  )
}

type CommentItemProps = {
  comment: Comment
  postId: string
  isOwner: boolean
  isEditing: boolean
  editContent: string
  onStartEdit: () => void
  onCancelEdit: () => void
  onChangeEdit: (value: string) => void
  onFinishEdit: () => void
}

function CommentItem({
  comment,
  postId,
  isOwner,
  isEditing,
  editContent,
  onStartEdit,
  onCancelEdit,
  onChangeEdit,
  onFinishEdit,
}: CommentItemProps) {
  const updateComment = useUpdateComment(postId, comment.id)
  const deleteComment = useDeleteComment(postId, comment.id)

  function handleSave() {
    if (!editContent.trim()) return
    updateComment.mutate(editContent, {
      onSuccess: onFinishEdit,
    })
  }

  function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return
    deleteComment.mutate()
  }

  return (
    <div
      data-testid={`comment-${comment.id}`}
      className="mt-4 border border-muted/20 rounded-xl shadow-xl"
    >
      {isEditing ? (
        <div className="p-4">
          <textarea
            value={editContent}
            onChange={(e) => onChangeEdit(e.target.value)}
            className="w-full border border-border rounded-lg p-2 text-ink"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              disabled={updateComment.isPending}
              className="bg-accent text-ink font-bold px-3 py-1 rounded text-sm"
            >
              Salvar
            </button>
            <button onClick={onCancelEdit} className="text-ink/60 text-sm">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <p className="text-md text-ink/80 p-4">{comment.content}</p>
      )}
      <div className="flex flex-col justify-end items-end mt-6 border-t border-muted/50 py-4 bg-primary">
        <p className="font-sans font-bold text-on-dark px-4">{comment.author.name}</p>
        <span className="text-sm text-on-dark/60 px-4">{formattedDate(comment.createdAt)}</span>
        {isOwner && !isEditing && (
          <div className="flex gap-3 px-4 mt-2">
            <button
              onClick={onStartEdit}
              aria-label="Editar comentário"
              className="text-on-dark/80 text-sm hover:text-on-dark"
            >
              <Pen className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              aria-label="Excluir comentário"
              className="text-red-400 text-sm hover:text-red-300"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
