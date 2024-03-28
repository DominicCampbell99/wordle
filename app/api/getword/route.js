import wordsFile from "@/utils/wordFileReader";
import { NextResponse } from "next/server";


function getRandomWord(data) {
    const words = data.split('\n');
    const cleanWords = words.filter(word => word.trim().length > 0);
    const randomIndex = Math.floor(Math.random() * cleanWords.length);
    const randomWord = cleanWords[randomIndex];
    return randomWord;
}


export async function GET(req) {
    const randomFiveLetterWord = getRandomWord(wordsFile);
    return NextResponse.json({ word: randomFiveLetterWord});
}