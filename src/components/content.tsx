import { useState } from "react"
import Sender from "./steps/first";
import Receiver from "./steps/third";

function Content() {
    // fields state

    const steps = [
        {
            header: "sender page",
            description: "calculate check address",
            number: 1
        },
        {
            header: "receiver page",
            description: "get jettons from check",
            number: 2
        }
    ]

    const getContent = (num: number) => {
        if (num === 1) {
            return <Sender></Sender>
        } else {
            return <Receiver></Receiver>
        }
    }

    // pagination
    const [currentStep, setCurrentStep] = useState(steps[0]);
    const setReceiverPage = () => {
        if (currentStep.number == 2) {
            return
        }
        setCurrentStep(steps[1])
    }
    const setSenderPage = () => {
        if (currentStep.number == 1) {
            return
        }
        setCurrentStep(steps[0])
    }

    return (
        <section className="content">
            <div className="content_pagination">
                <button onClick={setSenderPage} disabled={currentStep.number == 1}>sender page</button>
                <button onClick={setReceiverPage} disabled={currentStep.number == steps.length}>receiver page</button>
            </div>
            <h1 className="content_header">{currentStep.header}</h1>
            <h3 className="content_description">{currentStep.description}</h3>
            <div className="content_action">{getContent(currentStep.number)}</div>

        </section>
    )
}

export default Content