import React from "react";
import UIDefaultBtn from "../UI/UIDefaultBtn";
import PageNotFoundBlock from "../features/PageNotFoundBlock";
const PageNotFoundWidget = () => {
    return (
        <main className="page-not-found-widget">
            <PageNotFoundBlock/>
            <UIDefaultBtn link="/"/>
        </main>
    );
};

export default PageNotFoundWidget;
