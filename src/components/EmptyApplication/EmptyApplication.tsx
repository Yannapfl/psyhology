import { AppRoutes } from "@/constants/AppRoutes";
import UserIcon from "../../../public/icons/iconsComponent/UserIcon"
import { useRouter } from "next/navigation";

export default function EmptyApplication() {
    const router = useRouter();



    return (
        <div className="psy-empty" style={{ margin: '7em 12em', width: '65%'}}>
            <UserIcon width={64} style={{ color: '#949494'}} />

            <h2>У вас еще нет психолога</h2>
            <h4>Заполните анкету — мы подберём психолога который вам подойдёт</h4>
            <button onClick={() => router.push(AppRoutes.application_client)}>Перейти к анкете</button>
        </div>
    )
}