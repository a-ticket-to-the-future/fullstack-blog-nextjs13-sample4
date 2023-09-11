import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();


// export async function main(){
//     try{
//         await prisma.$connect();
//     } catch(err) {
//         return Error("DB接続に失敗しました")
//     }
// }





//ブログの詳細事取得API
export const GET = async (req: Request,res: NextRequest) => {

    try{

        const id:number = parseInt(req.url.split("/blog/")[1]);  //ここのparseInt（整数変換のこと）忘れないで覚えておいて！！

        await main();
        const post = await prisma.post.findFirst({where:{id }});
        return NextResponse.json({message:"Success" , post},{status:200})
    } catch(err) {
        return NextResponse.json({message:"Error"},{status:500})
    } finally {
        await prisma.$disconnect();
    }

};



//ブログ記事編集用API
export const PUT = async (req: Request,res: NextRequest) => {

    try{

        const id:number = parseInt(req.url.split("/blog/")[1]);  //ここのparseInt（整数変換のこと）忘れないで覚えておいて！！

        const {title , description} = await req.json();

        await main();
        const post = await prisma.post.update({
            data:{title , description},
            where:{id},
        });
        return NextResponse.json({message:"Success" , post},{status:200})  //200のままでsuccessだった
    } catch(err) {
        return NextResponse.json({message:"Error"},{status:500})
    } finally {
        await prisma.$disconnect();
    }

};




//ブログ記事削除用API
export const DELETE = async (req: Request,res: NextRequest) => {

    try{

        const id:number = parseInt(req.url.split("/blog/")[1]);  //ここのparseInt（整数変換のこと）忘れないで覚えておいて！！


        await main();
        const post = await prisma.post.delete({
            where:{id},
        });
        return NextResponse.json({message:"Success" , post},{status:200})  //200のままでsuccessだった
    } catch(err) {
        return NextResponse.json({message:"Error"},{status:500})
    } finally {
        await prisma.$disconnect();
    }

};

