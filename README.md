This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How i handle data from api
### product
After fetching data from the API, I perform an upsert for the product data to ensure that existing records are updated while new ones are inserted.

For product reviews, I use a delete-all-and-insert-from-scratch approach. I chose this method to avoid duplication and maintain database efficiency for the products table.

I opted for this approach for reviews because the current number of reviews is still relatively small. Once the dataset grows to thousands of entries, we can scale and implement a more optimized algorithm to handle the data.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev    
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


todo list :

1. change repo to upsert
2. fix how to handle log and failed insert in save data product
3. order trigger