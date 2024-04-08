import Header from "../../components/Header"

const DocumentPage = () => {
    return (
        <div>
            <Header />
            <h1>Document Management</h1>
            <div className="container" style={{padding: "4px"}}>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                        type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                            Inbox
                    </button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" 
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Sent
                    </button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" 
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Drafts
                    </button>
                    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" 
                        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                            Deleted
                    </button>
                    </div>
                </nav>

                {/* Nav Content */}
                <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    
                    <div class="mt-4">
                        <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Status</th>
                                <th scope="col">Last change</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Title</td>
                                <td>Completed</td>
                                <td>1/1/1</td>
                                <td>
                                    <a href="/courses/{{this.slug}}" class="btn btn-outline-success" title="Chi tiết">
                                    <i class="fa-solid fa-circle-info"></i>
                                    </a>
                                    <button type="button" data-id="{{this._id}}" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" title="Xóa">
                                    <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                    <a href="/courses/{{this._id}}/edit" class="btn btn-outline-warning" title="Chỉnh sửa">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                </td>
                            </tr>

                        </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentPage