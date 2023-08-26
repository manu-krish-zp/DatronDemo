import { useRouter } from "next/router";

const Home = () => {
    const { replace } = useRouter();
    replace('/home')
};

export default Home;
