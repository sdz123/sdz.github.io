import Book from './book/Book'
function handleData(book) {
    const _book = JSON.parse(book);
    return new Book(_book);
}
export default handleData