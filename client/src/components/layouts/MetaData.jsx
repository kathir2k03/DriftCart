import { Helmet } from "react-helmet-async"

const MetaData = ({title}) => {

    return(
        <Helmet>
            <title>{`${title} - DriftCart`}</title>
        </Helmet>
    )
}

export default MetaData