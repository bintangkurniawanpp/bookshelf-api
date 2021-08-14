const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // Cek finish
    const isFinished = (pageCount, readPage) => {
        if (pageCount === readPage){
            return true;
        }
        return false;
    }
    const finished = isFinished(pageCount, readPage)

    // Cek nama
    if (!name){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    // Cek readPage > pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };

    books.push(newBook);

    // cek Success
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess){
        const response = h.response(
            {
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id
                }
            }
        );
        response.code(201);
        return response
    }

    // cek Gagal
    const response = h.response({
        status : 'error',
        message : 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response
}

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books : books.map(({id, name, publisher}) => ({
            id : id,
            name : name,
            publisher : publisher
        })),
    }
});

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter(({id}) => id === bookId)[0];

    if (book !== undefined) {
        return {
        status: 'success',
        data: {
            book,
        },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex(({id}) => id === bookId);

    // Cek nama
    if (!name){
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

    // Cek readPage > pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    // Cek id
    if (index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    return response.code(404);
}

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex(({id}) => id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response(
            {
                status: 'success',
                message: 'Buku berhasil dihapus',
            }
        );
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}







module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};