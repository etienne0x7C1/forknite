import { useEffect, useRef } from "react";

/**
 * FPS stats widget
 */
 export const StatsWidget = ({instance}) => {
    const ref: any = useRef();

    useEffect(() => {
        console.log("[StatsWidget] init")
        if (instance) ref.current.appendChild(instance.stats.dom);
    }, [])

    console.log("[StatsWidget] refresh")

    return (<div ref={ref} className="ThreeStats" />)
}

/**
 * On screen debug information
 */
export const DebugInfos = () => {
    return (<></>)
}