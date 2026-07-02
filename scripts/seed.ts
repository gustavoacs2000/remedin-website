import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { FEATURE_ARTICLE, EXTRA_ARTICLES } from '../lib/blog-content'

const prisma = new PrismaClient()

async function main() {
  // Admin / test account
  const hashed = await bcrypt.hash('johndoe123', 10)
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: { email: 'john@doe.com', name: 'Admin Remedin', password: hashed, role: 'admin' },
  })

  const posts = [FEATURE_ARTICLE, ...EXTRA_ARTICLES]
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        author: p.author,
        coverImage: p.coverImage,
        content: p.content,
        readMinutes: p.readMinutes,
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        author: p.author,
        coverImage: p.coverImage,
        content: p.content,
        readMinutes: p.readMinutes,
      },
    })
  }

  console.log('Seed concluído:', posts.length, 'artigos.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
