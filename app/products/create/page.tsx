import CreateProductForm from "@/components/forms/CreateProduct";

function page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10 space-x-6">
        <CreateProductForm />
      </div>
    </>
  );
}

export default page;
