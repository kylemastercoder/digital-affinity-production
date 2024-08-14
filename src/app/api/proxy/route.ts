import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://digitalaffinity.kinde.com/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjliOjQ0OjNlOmNhOjA2OjM2OjNjOjZkOmVhOmUyOjczOjAxOjYzOjBiOmNiOjk1IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiaHR0cHM6Ly9kaWdpdGFsYWZmaW5pdHkua2luZGUuY29tL2FwaSJdLCJhenAiOiIyOGE4NDJiYjIxNjA0MWM1YWNhNWQyZDhhMmYxMjk1NyIsImV4cCI6MTcyMzcxNjM2MywiZ3R5IjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJpYXQiOjE3MjM2Mjk5NjMsImlzcyI6Imh0dHBzOi8vZGlnaXRhbGFmZmluaXR5LmtpbmRlLmNvbSIsImp0aSI6ImM5ZjQyZmE5LThmODktNGI0Zi1hZGU0LWMyN2NmZGMxM2E2NiIsInNjb3BlIjoiIiwic2NwIjpbXX0.vQo8GSlm_rX7VpStLPIb5N4azBeDZBArrXrPuAbo804BxAtymcXVyabOEUxMMArMgUj3I7LnLUhyKSYBuhPvSai2akElDALG4AUjKhrmxBVHL_jsLskBGrO8sxMyLI1q4oPTBQBAt_VgTwtVFDOz6-BI7qBpWtJwHT0arP_6HVqfb9POfZ4sjQKmApNMSUx-WV4FDiLgI5AzAnZc6eqYejuSrK7suSQsfVDsyMAl874fKj9pUcBat-Xyzdx3JnU6gR_SHcNnIJq--52t3w9LRl08US2p31lyUTcqgSTy2Xud2dFLMefinWDVoqJixqfIWbwzSn539p7849QljXFSfw', // Replace with your actual access token
        },
        body: req.body,
      });

      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
