
import Chapter from './Chapter';


const itemType = {
    CHAPTER: 1,
    TASK: 3,
};

const chapters = new Map();
const tasks = new Map();
function parseBookChildren(children) {
    if (!children || children.length <= 0) return [];
    for (let i = children.length - 1; i >= 0; i--) {
        const child = children[i];
        switch (child.type) {
            case itemType.CHAPTER:
                chapters.set(child.id, new Chapter(child));
                break;
            case itemType.TASK:
                tasks.set(child.id, child);
                break;
            default:
                break;
        }
    }
    const firstLevelChild = [];


    chapters.forEach((chapter) => {
        const parentId = chapter.getParentId();
        if (parentId) {
            chapters.get(parentId).addChapter(chapter);
        } else {
            firstLevelChild.push(chapter);
        }
    });
    // tasks.forEach((task) => {
    //     const parentId = task.getParentId();
    //     if (parentId) {
    //         chapters.get(parentId).addTask(task);
    //     }
    // });
    return firstLevelChild;
}


/**
 * Book对象
 * @param book 从native.getbookdata获取的原始数据
 *
 */
export default class Book {
    constructor({
                    bookId,
                    bookName, isFree, authDate, price, productId, children, subjectId, stageId,endTime,
                }) {
        this.id = bookId;
        this.name = bookName;
        this.productId = productId;
        this.authDate = authDate;
        this.price = price;
        this.isFree = isFree;
        this.subjectId = subjectId;
        this.stageId = stageId;
        this.chapters = new Map();
        this.endTime = endTime;
        this.children = parseBookChildren(children);
    }

    /**
     * 获取本教材bookid
     * @returns {String}
     */
    getId() {
        return this.id;
    }

    /**
     * 获取本教材教材使用的结束时间
     * @returns {String} 时间戳 若为0 则为无限期
     */
    getEndTime() {
        return this.endTime;
    }

    /**
     * 获取本教材名称
     * @returns {String}
     */
    getName() {
        return this.name;
    }

    /**
     * 获取本教材价格
     * @returns {String}
     */
    getPrice() {
        return this.price;
    }

    /**
     * 获取本教材产品id
     * @returns {String}
     */
    getProductId() {
        return this.productId;
    }

    /**
     * 获取本教材有效期，购买之后可以试用多少天
     * @returns {Number}
     */

    getAuthDate() {
        return this.authDate;
    }

    /**
     * 获取本教材一级子章节
     * @returns {Array}
     */
    getChildren() {
        return this.children;
    }

    /**
     * 根据指定id获取特定chapter
     * @param {string} chapterId  章节id
     * @returns {Object}
     */
    getChapter(chapterId) {
        return this.chapters.get(chapterId);
    }

    /**
     * 返回学段id
     * @returns {String}
     */
    getStageId() {
        return this.stageId;
    }

    /**
     * 返回学科id
     * @returns {String}
     */
    getSubjectId() {
        return this.subjectId;
    }

    /**
     * 获取本教材是否可用
     * @returns {Boolean} true 可用 false 不可用
     */
    getIsFree() {
        return !!this.isFree;
    }
}
