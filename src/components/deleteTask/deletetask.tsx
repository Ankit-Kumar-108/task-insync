"use client"
import deleteTask from "@/actions/deleteTask/deleteTask";
import { useFormStatus } from "react-dom";
import Loader from "../Loading/Loading";
import toast from "react-hot-toast";

type DeleteTaskProps = {
    title:string, 
    task_Id:string
}

 function DeleteButton () {
    const {pending} = useFormStatus ()
    return(
        <button
                type="submit"
                title="Delete Task"
                disabled = {pending}
                className="flex size-8 items-center justify-center rounded text-[#64748b] dark:text-[#9dabb9] hover:text-blue-500">
                {pending? (
                    <Loader/>
                ) : (
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                )}
            </button>
    )
 } 

export default function DeleteTask({title, task_Id}:DeleteTaskProps) {
    const DeleteActionwithArgs =  async () => {
                try {
                    const currentPath = title.toLowerCase() === "today" ? "/" : `/${title.toLowerCase()}`
                    await deleteTask(task_Id, currentPath)
                   toast.success("Deleted")
                } catch (error:any) {
                    console.log("error deleting task:", error)
                }
            }

    return (
    <form action={DeleteActionwithArgs}>
        <DeleteButton/>
    </form>
           
        
    )
}