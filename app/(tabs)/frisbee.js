import {Button} from "../../components/button";
import MainView from "../../components/MainView";
import {bee} from "../../lib/http-common";

export default function Frisbee() {


    const click = () => {
        bee.get("/api/tickets", {
            body: {
                email: "kalle@kalle.se",
                password: "password",
                device_name: "mobile",
            }
        }).then((response) => {
            console.log(JSON.stringify(response, null, 2))
        })

    }

    return (
        <MainView>
            <Button onPress={click}>Frisbee</Button>
        </MainView>
    )
}
