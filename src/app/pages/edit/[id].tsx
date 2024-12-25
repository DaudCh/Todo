
import { PrismaClient } from "@prisma/client";  // Correct import for PrismaClient
import { getSession, } from "next-auth/react";
import { GetServerSidePropsContext } from "next";  // Import for Next.js context

const prisma = new PrismaClient();  // Initialize PrismaClient

// Define the Todo type
interface Todo {
  id: number;
  name: string;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);  // getSession now works correctly with the context

  if (!session) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(context.params?.id as string, 10) },  // Ensure 'id' is correctly parsed
  });

  return { props: { todo } };
};

const EditTodo = ({ todo }: { todo: Todo }) => {
  const handleUpdate = async () => {
    // Add the logic to update the todo
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <input defaultValue={todo.name} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditTodo;
