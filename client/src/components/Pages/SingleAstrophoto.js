import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/SingleProject.css";
import Loading from "../../Animations/Loading";
import { REACT_APP_BASE_TITLE, REACT_APP_SERVER } from "../../grobalVars";
import { animateScroll } from "react-scroll";

function SingleAstrophoto() {
    const { photoId } = useParams();
    const [photo, setPhoto] = useState(undefined);
    const [fetching, setFetching] = useState(1)
    const history = useHistory();

    useEffect(() => {
        animateScroll.scrollToTop()

        fetch(`${REACT_APP_SERVER}/api//astrophotographies/${photoId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                document.title = `${data.title} | ${REACT_APP_BASE_TITLE}`;
                if (data.error) history.push("/404");
                setPhoto(data);
                setFetching(0)
            });
    }, []);

    return (
        <>
            <Loading time={1} fetching={fetching} />
            <div className="my-5">
                <div className="mb-4">
                    <h4 className='my-3' style={{ marginBottom: "0px", textAlign: "center" }}>{photo?.title}</h4>
                    <div
                        className="miniSep"
                        style={{ marginBottom: "40px", background: "rgb(204, 67, 67)" }}
                    ></div>
                </div>
                <div className="container">
                    <hr />
                    <div className="image mx-auto" style={{ maxWidth: '50rem' }}>
                        <a href={photo?.pic} target="_blank">
                            <img src={photo?.pic} alt="img" className='my-3 photo__photo shadow' />
                        </a>
                    </div>
                    <hr />
                    <div>
                        <h3 className='my-3 subheaders'>Instrument Used</h3>
                        <p className="px-5">{photo?.instrumentUsed}</p>
                    </div>
                    <div>
                        <h3 className='my-3 subheaders'>Instrument Settings</h3>
                        <p className="px-5">{photo?.instrumentSettings}</p>
                    </div>
                    <div>
                        <h3 className='my-3 subheaders'>Clicked By: </h3>
                        <ul className="px-5">
                            {photo?.members?.map((member, i) =>
                                member.accepted ? (
                                    <li key={i}>
                                        {member.user.linkedin_url ? (
                                            <a href={member.user.linkedin_url}>{member.user.name}</a>
                                        ) : (
                                            <span>{member.user.name}</span>
                                        )}
                                    </li>
                                ) : (
                                    <></>
                                )
                            )}
                        </ul>
                    </div>
                    <div className='' style={{ marginBottom: '5rem' }}>
                        <div className='my-3 photo__desc'>
                            <h3 className='my-3 subheaders'>Description : </h3>
                            <div className="my-5 text-center ql-editor container"
                                dangerouslySetInnerHTML={{ __html: photo?.desc }}
                            >
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SingleAstrophoto;
