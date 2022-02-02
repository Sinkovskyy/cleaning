import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import authService from "../../services/auth.service";
import { FlexWrapper } from "../styled/flexWrapper";
import { FlexDirection } from "../../interfaces/enums/flexDirection";
import { useEffect, useState } from "react";




const Header: React.FC = (props) => {


    const navigate = useNavigate();

    const [wallet, setWallet] = useState<number>();

    useEffect(() => {

        if (!wallet) {
            authService.getCurrentUserWallet().then(response => {
                if (response) {
                    setWallet(response.data);
                }
            });
        }
    });


    const logout = () => {

        authService.logout().then(response => {
            navigate('/');
        });

    }

    return (
        <>
            <FlexWrapper direction={FlexDirection.row}>
                <h2>{authService.getCurrentUser().name}</h2>
                <h2>Wallet:<span>{wallet}</span></h2>
                <Button onClick={logout}>Logout</Button>
            </FlexWrapper>

        </>
    );

};


export default Header;