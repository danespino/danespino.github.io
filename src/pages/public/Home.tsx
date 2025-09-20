import Navbar from "../../components/ui/navbar"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen dark:bg-black">
        <h1 className="text-4xl font-bold">Welcome to the home page</h1>
      </div>
    </>
  )
}