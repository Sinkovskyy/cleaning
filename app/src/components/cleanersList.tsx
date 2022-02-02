import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FlexDirection } from "../interfaces/enums/flexDirection";
import ICleaner from "../interfaces/ICleaner";
import cleanerService from "../services/cleaner.service";
import { FlexWrapper } from "./styled/flexWrapper";




const CleanerList: React.FC = () => {

    const [cleanersList, setCleanersList] = useState<ICleaner[]>([]);


    useEffect(() => {

        // Retrieve cleaners from db
        if (!cleanersList.length) {

            cleanerService.getALL().then(response => {
                if (response && response.data.length) {
                    setCleanersList(response.data);
                }
            });

        }


    });

    return (
        <>
            <h1>Cleaners List</h1>
            <ListGroup as="ol" numbered>

                {cleanersList.map((cleaner, index) => {
                    return (

                        <a href={`/account/cleaner/${cleaner.name}`} key={index} >
                            <ListGroup.Item as="li" >
                                <FlexWrapper direction={FlexDirection.row}>

                                    <span>{cleaner.name}</span>
                                    <img src={cleaner.images[0]}></img>

                                </FlexWrapper>

                            </ListGroup.Item>
                        </a>

                    );
                })}


            </ListGroup>
        </>
    );
};





export default CleanerList;