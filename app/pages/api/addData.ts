import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { Category, Link, Details, Recommender } = req.body;

    // TODO: Use Google Sheets API to append new data.
    // You'll need to set up the Sheets API client and credentials.

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
