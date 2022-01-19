import Modules, { NavBar } from "./appRouting";
import { ThreeExp } from "./three-experiments";

/**
 * Reference modules here 
 */
export default ({ args }: any) => {
  return (
    <>
      <NavBar />
      <Modules>
        {/* <SomeModule/> */}
        {/* <AnotherModule/> */}
        <ThreeExp/>
      </Modules>
    </>
  );
};
