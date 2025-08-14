
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

// import { getManagedRestaurant } from "../api/get-managed-restaurant";
// import { getProfile } from "../api/get-profile";
// import { signOut } from "../api/sign-out";
import { Skeleton } from "../components/ui/skeleton";
// import { StoreProfileDialog } from "./store-profile-dialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession } from "@/hooks/use-session";

export function AccountMenu() {
  const navigate = useNavigate();

  const { signOut, user } = useSession()

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 select-none"
          >
            {!user ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              user?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span>
              {!user ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                user?.role
              )}
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {!user ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                user?.email
              )}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4 " />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            // disabled={isSigningOut}
            className="  text-rose-500 dark:text-rose-400"
          >
            <button className="w-full" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4 " />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <StoreProfileDialog /> */}
    </Dialog>
  );
}
