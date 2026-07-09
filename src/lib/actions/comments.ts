'use server'

import {
  createComment as apiCreateComment,
  deleteComment as apiDeleteComment,
  getCommentsByPost as apiGetComments,
  updateComment as apiUpdateComment,
} from '@/lib/api/comments'

export async function createComment(postId: string, content: string) {
  return apiCreateComment(postId, content)
}

export async function updateComment(postId: string, commentId: string, content: string) {
  return apiUpdateComment(postId, commentId, content)
}

export async function deleteComment(postId: string, commentId: string) {
  return apiDeleteComment(postId, commentId)
}

export async function getComments(postId: string) {
  return apiGetComments(postId)
}
