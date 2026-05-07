import { Helmet } from "react-helmet-async"

const MetaData = ({title}) => {

    return(
        <Helmet>
            <title>{`${title} - Kat cart`}</title>
        </Helmet>
    )
}

export default MetaData