import { atom } from "recoil";

const jwtTokenRecoilAtom = atom({
    key: "jwtTokenRecoilAtom",
    default: "",
});

export default jwtTokenRecoilAtom;
