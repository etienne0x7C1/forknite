import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ForkniteDemo } from "./forknite-demo/ForkniteDemo"
// import { AppRoutes, NavBar } from "../pwa-tools/utils/routing"

import { BuildNum } from '../pwa-tools/UI/elements';
import { BASENAME } from './config';

import { TouchControls } from '../pwa-tools/tools/TouchControls';
import { TouchInterface } from '../pwa-tools/tools/TouchInterface';
import { ThreeApp } from '../three-core-modules/core/ThreeApp';
import { isMobile } from '../pwa-tools/utils/misc';
import { DebugInfos, StatsWidget } from './ThreeReactTools';
import "../pwa-tools/pwa.css"
import "./styles.css"
// Entry point
const App = () => {
    return (
        <BrowserRouter basename={BASENAME}>
            <Routes >
                <Route index element={<Home />} />
                <Route path="/forknite" element={<ThreeReactWrapper appClass={ForkniteDemo} />} />
            </Routes>
        </BrowserRouter>
    );
}

/**
 * React wrapper for launching three applications
 * Bridge between PWA <-> THREE
 * @returns 
 */
export const ThreeReactWrapper = ({ appClass }) => {
    const canvasRef: any = useRef()
    const [instance, setInstance] = useState()
    const touchRef = useRef()
    // const [item, setItem] = useState(-1);
    // const [mode, setMode] = useState(null);

    useEffect(() => {
        // const stateProps = { setItem, setMode };
        //(demo as any).initState(stateProps);
        const instance = ThreeApp.instanciate(appClass, canvasRef)

        // if (instance?.state) {
        //     instance.state.isMobile = isMobile()
        //     console.log("is mobile: " + instance.state.isMobile)
        // }
        instance.onWindowResize();
        (instance as any).animate()
        touchRef.current = instance.controls
        // lock screen in landscapte mode
        window.screen.orientation.lock("landscape").then(val => console.log(val))
        setInstance(instance)
    }, [])

    // sync react and three states
    // useEffect(() => {
    //     ThreeApp.instances[0].state.item = item;
    //     ThreeApp.instances[0].state.mode = mode;
    // }, [item, mode])

    console.log("is ready? " + instance !== undefined)

    return (
        <>
            <div className="ThreeApp" >
                <canvas ref={canvasRef} />
                {instance ? <>
                    <TouchControls touchRef={touchRef} >
                        <TouchInterface touchRef={touchRef} />
                    </TouchControls>
                    <StatsWidget instance={instance} />
                </> : <LoadingScreen />}
                {/* {currentBottle && mode === CONTROL_MODES.SELECTED && <OverlayV bottleCfg={currentBottle.config} onClose={closeOverlay} />} */}
            </div>
            <DebugInfos />
        </>

    );
}

const Home = () => {
    const [title, setTitle] = useState("WELCOME")
    return (
        <div className="HomeScreen ">
            <div className="center">
                <h1>
                    {title}
                </h1>
                <Link onClick={() => setTitle("LOADING")} to={"/forknite"}> <h3 className="blink">Press to start</h3> </Link>
            </div>
            <BuildNum />
        </div>)
}


export const LoadingScreen = () => {
    console.log("loading")
    return (
        <div className="LoadingScreen ">
            <div className="center">
                {/* <img src={logo} className="logo" alt="logo" /> */}
                <h2>
                    LOADING
                </h2>
                <p className="blink-color">Please wait...</p>
            </div>

        </div>
    );
}

export default App