import LoginForm from "@/components/forms/LoginForm";

function loginPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-col w-[650px] h-[480px] border items-center justify-center p-16">
        <div className="flex flex-row justify-center items-center mb-16 gap-3">
          <p className="text-center font-bold text-[#0D1821] text-4xl">Login</p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}

export default loginPage;
