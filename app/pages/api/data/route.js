// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'data.json');

// function readDataFromFile() {
//   if (fs.existsSync(filePath)) {
//     const fileData = fs.readFileSync(filePath, 'utf8');
//     return JSON.parse(fileData);
//   }
//   return [];
// }

// function writeDataToFile(data) {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// export async function GET() {
//   const fileData = readDataFromFile();
//   return NextResponse.json({ data: fileData });
// }

// export async function POST(request) {
//   try {
//     const newData = await request.json();
//     if (!newData.name || !newData.population) {
//       return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
//     }
    
//     newData.id = Date.now(); // Generate unique ID for each entry
//     const currentData = readDataFromFile();
//     const updatedData = [...currentData, newData];
    
//     writeDataToFile(updatedData);
//     console.log("Data saved:", updatedData);
//     return NextResponse.json({ message: 'Data saved successfully!', data: updatedData });
//   } catch (error) {
//     console.error("Error writing data:", error);
//     return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
//   }
// }