/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import Photo from './Photo';

const Photos = () => {
    let [data, setData] = useState([]);
    let [albumNo, setAlbumNo] = useState(1);
    let [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(
                `https://jsonplaceholder.typicode.com/albums/${albumNo}/photos`
            )
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            });
    }, [albumNo]);

    return (
        <div>
            <p id="photos-app-uniqueId">
                Displaying album <b>{albumNo}</b> photos
            </p>
            {isLoading ? (
                    <span className='visually-hidden'>Loading...</span>
            ) : (
                data.map((val, index) => {
                    return (
                        <Photo
                            key={index}
                            fullImg={val.url}
                            imgsrc={val.thumbnailUrl}
                            title={val.title}
                        />
                    );
                })
            )}

            <div className='pageClass'>
                <Pagination className='col-lg-4 col-md-3 mt-2 mx-auto col-sm-4 '>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink
                            onClick={() => setAlbumNo(1)}
                            first
                        ></PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink
                            previous
                            onClick={() => {
                                if (albumNo > 1) {
                                    setAlbumNo(albumNo - 1);
                                } else {
                                    setAlbumNo(1);
                                }
                            }}
                        ></PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink onClick={() => setAlbumNo(1)}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink onClick={() => setAlbumNo(2)}>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink onClick={() => setAlbumNo(3)}>
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink onClick={() => setAlbumNo(4)}>
                            4
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink onClick={() => setAlbumNo(5)}>
                            5
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink
                            next
                            onClick={() => {
                                if (albumNo >= 100) {
                                    setAlbumNo(100);
                                } else {
                                    setAlbumNo(albumNo + 1);
                                }
                            }}
                        ></PaginationLink>
                    </PaginationItem>
                    <PaginationItem className='mx-md-auto'>
                        <PaginationLink
                            onClick={() => setAlbumNo(100)}
                            last
                        ></PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );
};
export default Photos;
