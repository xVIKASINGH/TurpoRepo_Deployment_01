import {prisma} from "@repo/db";
import { config } from "dotenv";
config();


export default  async function Home() {
  const user=await prisma.user.findMany();
  return (
    <div >
   <p>{JSON.stringify(user)}</p>
    </div>
  );
}


export const validate="60"