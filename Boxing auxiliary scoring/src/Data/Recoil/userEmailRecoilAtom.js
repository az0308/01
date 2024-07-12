import { atom } from "recoil";

const userEmailRecoilAtom = atom({
    key: "userEmailRecoilAtom",
    default: "",
});

export default userEmailRecoilAtom;
