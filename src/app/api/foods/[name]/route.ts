import { foods } from "@/src/data";
import { IFood } from "@/src/types";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params }: { params: { name: string } }) {
    const index = foods.findIndex(
        (food: IFood) => food.name.toLowerCase().replace(/ /g, '-') === params.name)

        if (index !== -1) {
            
            return new Response(JSON.stringify(foods[index]),{
                headers: {
                    "Content-Type":"application.json",
                },
                status: 200
            })
        }
        else{
            return new Response ( "Not Found", {headers: {
                "Content-Type":"application.json",
            },
            status: 404
        }
            )
        }
}