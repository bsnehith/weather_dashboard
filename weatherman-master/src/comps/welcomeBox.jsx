import { handleSearchNameReq, handleFinalSearch } from './apiBed.jsx';
import '../styles/WelcomeBox.css'; 


const WelcomeBox = ({ changeData }) => {
    const handleSearchInput = async (q) => {
        const result = await handleSearchNameReq(q.target.value, 5);
        // handle autocomplete here
    }

    const handleSearching = async (qd) => {
        qd.preventDefault();
        const queryCity = await handleSearchNameReq(qd.target.q.value);
        if (queryCity == null) {
            qd.target.q.classList.add('is-invalid');
            qd.target.q.classList.add('shake');
        } else {
            qd.target.q.classList.remove('is-invalid');
            qd.target.q.classList.remove('shake');
            const result = await handleFinalSearch(queryCity[0]['lat'], queryCity[0]['lon']);
            changeData(result);
        }
    }

    return (
        <>
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="row text-center vw-100">
                    <br />
                    <div className="col-lg-12">
                        <h1 className="display-3 fade-in-text">
                            <span className="text-body-secondary">Weather</span>Man
                        </h1>
                        <br />
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <form onSubmit={handleSearching}>
                            <div className="input-group border rounded-5">
                                <input
                                    placeholder="Enter the City"
                                    className="form-control bg-light border-light rounded-5 rounded-end input-animation"
                                    type="search"
                                    name="q"
                                    id="queryBar"
                                    onChange={handleSearchInput}
                                />
                                <span
                                    className="input-group-text border-light rounded-5 rounded-start search-icon-animation"
                                    id="basic-addon1"
                                >
                                    🔍
                                </span>
                            </div>
                            <br />
                        </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </div>
        </>
    );
}

export default WelcomeBox;
