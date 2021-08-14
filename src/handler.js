const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

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
        updateAt
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
        books : books.map((book) => ({
            id : book.id,
            name : book.name,
            publisher : book.publisher
        })),
    }
});







module.exports = { addBookHandler, getAllBooksHandler };