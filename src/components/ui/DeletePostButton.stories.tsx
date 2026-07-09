import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DeletePostButton } from './DeletePostButton'

const meta: Meta<typeof DeletePostButton> = {
  component: DeletePostButton,
}
export default meta

type Story = StoryObj<typeof DeletePostButton>

export const Default: Story = {
  args: {
    slug: 'melhores-ciclovias-jundiai',
    postTitle: 'As melhores ciclovias de Jundiaí',
  },
}
