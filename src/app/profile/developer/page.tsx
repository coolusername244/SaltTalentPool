"use client";
import { api } from "@/trpc/react";
import DeveloperForm from "../../_components/profile/developer/DeveloperForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import defaultDeveloperData from "@/app/_components/profile/developer/helpers/defaultDeveloperData";
import Button from "@/app/_components/Button";
import Icon from "@/app/assets/icons/Icon";
import Link from "next/link";

const DeveloperPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const { mutate: createUser, isLoading: creatingUser } =
    api.developer.create.useMutation({
      onSuccess: () => {
        router.push("/profile");
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  const newData = defaultDeveloperData();
  if (data) {
    newData.name = data.user.name ?? "";
    newData.mail = data.user.email ?? "";
  }
  return (
    <main className="flex flex-col gap-2 p-2">
      <Link className="sticky top-0 w-10" href={"/profile"}>
        <Icon
          icon="arrowLeft"
          className="h-10 w-10 rounded-full bg-black fill-white"
        />
      </Link>
      <DeveloperForm developer={newData} handleData={createUser}>
        <Button className="py-2" disabled={creatingUser} form="developer-form">
          Create user
        </Button>
      </DeveloperForm>
    </main>
  );
};

export default DeveloperPage;
