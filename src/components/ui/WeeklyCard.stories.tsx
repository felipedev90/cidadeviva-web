import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WeeklyCard } from './WeeklyCard'

const meta: Meta<typeof WeeklyCard> = {
  component: WeeklyCard,
}
export default meta

type Story = StoryObj<typeof WeeklyCard>

export const Default: Story = {
  args: {
    post: {
      id: '1',
      slug: 'melhores-ciclovias-jundiai',
      title: 'As melhores ciclovias de Jundiaí',
      excerpt: 'Conheça os trajetos mais bonitos para pedalar pela cidade.',
      content: '',
      coverImage: 'https://picsum.photos/seed/ciclovias/800/600',
      category: 'ciclismo',
      published: true,
      createdAt: '2026-06-01T12:00:00.000Z',
      updatedAt: '2026-06-01T12:00:00.000Z',
      author: {
        id: '1',
        name: 'Felipe Augusto',
        email: 'felipe@cidadeviva.com',
      },
    },
  },
}

export const SemImagem: Story = {
  args: {
    ...Default.args,
    post: {
      ...Default.args!.post!,
      coverImage: '',
    },
  },
}
