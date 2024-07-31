import {useEffect, useState} from "react";
import StepProgress from "./StepIndicator";
import i18n from "i18next";
import i18next from "i18next";

const customStyles = {
    // stepIndicatorSize: 25,
    // currentStepIndicatorSize: 30,
    // separatorStrokeWidth: 2,
    // currentStepStrokeWidth: 3,

    // stepStrokeCurrentColor: '#fe7013',
    // stepStrokeWidth: 3,
    // stepStrokeFinishedColor: '#fe7013',
    // stepStrokeUnFinishedColor: '#aaaaaa',

    // separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: 'lightgray',

    // stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: 'lightgray',
    // stepIndicatorCurrentColor: '#ffffff',r
    // stepIndicatorLabelFontSize: 13,
    // currentStepIndicatorLabelFontSize: 13,

    // stepIndicatorLabelCurrentColor: '#fe7013',
    // stepIndicatorLabelFinishedColor: '#ffffff',
    // stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    // currentStepLabelColor: '#fe7013'
}

export default function Stepper({current, list}) {

    const [currentPosition, setCurrentPosition] = useState(0)
    const [useTextField, setUseTextField] = useState(i18n.language === "en" ? "text_en" : "text");
    const [labels, setLabels] = useState(list.list_template_categories.map(cat => cat[useTextField]))

    useEffect(() => {
        setUseTextField(i18n.language === "en" ? "text_en" : "text")
        setLabels(list.list_template_categories.map(cat => cat[useTextField]))
    }, [i18n.language]);

    function onPageChange(position) {
        setCurrentPosition(position);
    }

    useState(() => {
        setCurrentPosition(current)
    }, [current])

    return (
        <StepProgress
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={labels.length}
        />
    )


}

