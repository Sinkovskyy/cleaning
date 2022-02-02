import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListGroup, Button } from 'react-bootstrap';

import cleanerService from '../services/cleaner.service';
import ICleaner from '../interfaces/ICleaner';
import IFlexWrapper from '../interfaces/IFlexWrapper';
import IService from '../interfaces/IService';
import { FlexWrapper } from './styled/flexWrapper';
import ICleanerCard from '../interfaces/ICleanerCard';
import { FlexDirection } from '../interfaces/enums/flexDirection';









const clenearNameIsUnique = (name: string, cleanersList: ICleaner[]) => {


    for (let i in cleanersList) {
        if (name == cleanersList[i].name && !cleanersList[i].editing) {
            return false;
        }

    }
    return true;

}




const CleanerCard: React.FC<ICleanerCard> = ({ cleaner, cleanersList, setCleanersList }) => {

    const removeCleanerListner = (e: React.SyntheticEvent) => {
        const button = e.target as HTMLInputElement;
        const card = button.closest(".card") as HTMLElement;
        const id = card.getAttribute("id");

        setCleanersList(cleanersList.filter(element => {
            if (element.name == id) {

                cleanerService.removeCleaner(element.name);
                return;
            }
            return 1;
        }));

    };



    return (
        <div className='card' id={cleaner.name}>
            <FlexWrapper direction={FlexDirection.row}>
                <span className='name'>{cleaner.name}</span>
                <span className='description'>{cleaner.description}</span>
                <Button onClick={removeCleanerListner}>Remove</Button>
            </FlexWrapper >


            <div className='services'>
                {cleaner.services.map((service, index) => (

                    <FlexWrapper key={index} direction={FlexDirection.row} className='service'>
                        <span>{service.name}</span>
                        <span>{service.price}</span>

                    </FlexWrapper>

                ))}
            </div>


            <div className='images'>
                <FlexWrapper direction={FlexDirection.row} className='images'>
                    {cleaner.images.map((img, index) => (

                        <img key={index} src={img} />

                    ))}
                </FlexWrapper>

            </div>




        </div>

    )
};





const EditableCleanerCard: React.FC<ICleanerCard> = ({ cleaner, cleanersList, setCleanersList }) => {



    // TODO: async request to save data
    const saveCleanerDataListner = async (e: React.SyntheticEvent) => {

        const button = e.target as HTMLInputElement;
        const card = button.closest(".card") as HTMLInputElement;
        const id = card.getAttribute("id") as string;
        const name = (card.querySelector(".name") as HTMLInputElement).value as string;
        const description = (card.querySelector(".description") as HTMLInputElement).value as string;
        const servicesNodes = Array.from(card.querySelectorAll('.service'));
        const images = await getAllFiles();

        let services: IService[] = [];


        if (!name || !description) {
            return;
        }


        // Parse node elements array to Service object array
        services = servicesNodes.map(service => {
            const serviceName = (service.querySelector(".service_name") as HTMLInputElement).value as string;
            const price: number = +((service.querySelector(".service_price") as HTMLInputElement).value as string);

            return { name: serviceName, price: price };
        });


        // Filter not valid services
        services = services.filter(service => {

            if (!service.price || !service.name || service.price < 0) {
                return;
            }

            return 1;

        });


        if (!services.length) {
            return;
        }


        setCleanersList(cleanersList.map((element) => {

            if (id == element.name) {



                if (!clenearNameIsUnique(name, cleanersList)) {
                    return element;
                }


                element.editing = false;
                element.name = name;
                element.description = description;
                element.services = services;
                element.images = images as string[];
                cleanerService.createCleaner(element);

            }
            return element;
        }));

    };






    const removeCleanerSercviceListener = (e: React.SyntheticEvent) => {

        const button = e.target as HTMLInputElement;
        const card = button.closest('.card') as HTMLElement;
        const service_name = ((button.closest('.service') as HTMLElement).querySelector(".service_name") as HTMLInputElement).value as string;
        const id = card.getAttribute("id");


        const servicesNodes = Array.from(card.querySelectorAll('.service'));
        let services: IService[] = [];

        // Parse node elements array to Service object array
        services = servicesNodes.map(element => {
            const serviceName = (element.querySelector('.service_name') as HTMLInputElement).value as string;
            const price: number = +((element.querySelector('.service_price') as HTMLInputElement).value as string);

            return { name: serviceName, price: price };
        });


        // Remove current service
        services = services.filter(element => {

            if (service_name == element.name) {
                return;
            }

            return 1;

        });




        setCleanersList(cleanersList.map((element) => {

            if (id == element.name) {



                if (!clenearNameIsUnique(id, cleanersList)) {
                    return element;
                }

                element.services = services;


            }
            return element;
        }));

    };



    const addCleanerServiceListener = (e: React.SyntheticEvent) => {




        setCleanersList(cleanersList.map(element => {
            if (element.name == cleaner.name) {

                const service: IService = { name: "", price: 0 };
                element.services.push(service);
            }

            return element;
        }));


    };


    const cancelCleanerListner = (e: React.SyntheticEvent) => {
        const button = e.target as HTMLInputElement;
        const card = button.closest(".card") as HTMLElement;
        const id = card.getAttribute("id");

        setCleanersList(cleanersList.filter(element => {
            if (element.name == id) {
                return;
            }
            return 1;
        }));

    };


    const getAllFiles = async () => {

        const files = (document.querySelector("#filesInput") as HTMLInputElement).files;

        let binaries = Array.prototype.slice.call(files).map(file => {

            let reader = new FileReader();

            // Create a new promise
            return new Promise(resolve => {

                // Resolve the promise after reading file
                reader.onload = () => resolve(reader.result);

                // Reade the file as a text
                reader.readAsDataURL(file);

            });

        });

        // At this point you'll have an array of results
        const images = await Promise.all(binaries);


        return images



    }


    return (
        <div className='card' id={cleaner.name}>
            <FlexWrapper direction={FlexDirection.row}>

                <input className='name' type='text' defaultValue={cleaner.name} placeholder='name' />
                <input className='description' type='text' defaultValue={cleaner.description} placeholder='description' />
                <Button onClick={saveCleanerDataListner}>Save</Button>
                <Button onClick={cancelCleanerListner}>Cancel</Button>
            </FlexWrapper>
            <div className='services'>
                {cleaner.services.map((service, index) => (

                    <FlexWrapper key={index} direction={FlexDirection.row} className='service'>
                        <input className='service_name' type='text' defaultValue={service.name} placeholder='Service name' />
                        <input className='service_price' type='number' defaultValue={service.price} placeholder='Price' />
                        <Button onClick={removeCleanerSercviceListener}>Remove</Button>
                    </FlexWrapper>

                ))}

                <Button onClick={addCleanerServiceListener}>Add Service</Button>
            </div>

            <input type="file" id="filesInput" multiple name="file" />
            <img id="img" />
        </div>
    )
};










const AdminCleanersList: React.FC = () => {

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

    const addCleanerListener = () => {

        for (let i in cleanersList) {
            if (cleanersList[i].editing) {
                return;
            }
        };

        const newCleaner = new Array<ICleaner>({ name: "", description: "", services: [], images: [], editing: true });
        setCleanersList([...cleanersList, ...newCleaner]);

    };

    return (
        <>
            <h1>Cleaners List</h1>
            <ListGroup as="ol" numbered>

                {cleanersList.map((cleaner, index) => {
                    return (


                        <ListGroup.Item key={index} as="li">


                            {cleaner.editing ?
                                <EditableCleanerCard cleaner={cleaner} cleanersList={cleanersList} setCleanersList={setCleanersList} /> :
                                <CleanerCard cleaner={cleaner} cleanersList={cleanersList} setCleanersList={setCleanersList} />}
                        </ListGroup.Item>

                    );
                })}


            </ListGroup>
            <Button onClick={addCleanerListener}>Add Cleaner</Button>
        </>
    );
};





export default AdminCleanersList;