export default function Notfound(){
    return(
        <div className="container-fluid body-lists">
            <h1 className="notFound">Upsss! :(</h1>
                <div class="spinner-grow text-danger" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            <div>
                <h3 className='notFound'>No hemos podido encontrar la página que buscas, Intenta de nuevo</h3>
                <br />
            </div>
		</div>
    )
}