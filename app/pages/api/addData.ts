import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Method not allowed' });
    return;
  }

  const { Category, Link, Details, Recommender } = req.body;

  if (!Category || !Link || !Details || !Recommender) {
    res.status(400).send({ error: 'All fields are required.' });
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: require('../../../credentials/your-credentials-file.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1CpPH9yTkxAv9VqKmpZZlKx58Hh86q2XMZsG3NFZ6ZKE';

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[Category, Link, Details, Recommender]],
      },
    });

    res.status(200).send({ message: 'Data added successfully!' });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    res.status(500).send({ error: 'Failed to write to Google Sheets' });
  }
}
