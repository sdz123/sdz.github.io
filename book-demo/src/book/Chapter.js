
export default class Chapter {
    constructor({
                    id,
                    parentId,
                    displayName,
                    order,
                    isContent,
                    isFree,
                    lockState,
                    isPlaned,
                    chapterState,
                    studyPro,
                    chapterPoster,
                    extendParams,
                }) {
        this.id = id;
        this.parentId = parentId;
        this.name = displayName;
        this.order = order;
        this.downloadState = chapterState;
        this.poster = chapterPoster;
        this.studyPro = studyPro;
        this.isContent = !!isContent;
        this.isFree = !!isFree;
        this.isLocked = !!lockState;
        this.isPlaned = !!isPlaned;
        this.children = [];
        this.tasks = [];
        this.extendParams = {};
        Object.keys(JSON.parse(extendParams)).forEach((key) => {
            this.extendParams[key] = extendParams[key];
        });
    }
    /**
     * 获取本章节id
     * @returns {String}
     */
    getId() {
        return this.id;
    }

    /**
     * 获取本章节名称
     * @returns {String}
     */
    getName() {
        return this.name;
    }

    /**
     * 获取父级chapterId
     * @returns {String}
     */
    getParentId() {
        return this.parentId;
    }

    /**
     * 获取本章节序号
     * @returns {Number}
     */
    getOrder() {
        return this.order;
    }

    /**
     * 获取本章节章节下载状态
     * @returns {Number} 0：未下载 1：等待下载 2：已下载 3：有更新
     */
    getDownloadState() {
        return this.downloadState;
    }

    /**
     * 获取本章节章节封面图
     * @returns {String}
     */
    getPoster() {
        return this.poster;
    }

    /**
     * 获取本章节章节学习进度
     * @returns {String}
     */
    getStudyPro() {
        return this.studyPro;
    }

    /**
     * 获取本章节所有子章节实例 有task优先返回task
     * @returns {Array}
     */
    getChildren() {
        if (this.tasks.length > 0) {
            return this.tasks;
        }
        if (this.children.length > 0) {
            this.children.sort((a, b) => a.getOrder() - b.getOrder());
            return this.children;
        }
        return [];
    }

    /**
     * 获取本章节下的所有task
     * @returns {Array}
     * eg:[taskObj,taskObj,taskObj]
     */
    getTasks() {
        return this.tasks.length > 0 ? this.tasks : null;
    }

    /**
     * 根据id返回本Chapter下指定task对象
     * @returns {Object}
     */
    getTask(taskId) {
        if (this.tasks.length === 0) return null;
        if (taskId) {
            for (let i = this.tasks.length - 1; i >= 0; i--) {
                if (this.tasks[i].getId() === taskId) return this.tasks[i];
            }
        }
        return null;
    }

    /**
     * 添加子章节
     * @param {Chapter} chapter
     */
    addChapter(chapter) {
        if (chapter) {
            this.children.push(chapter);
        }
    }

    /**
     * 获取本章节下指定id的子章节实例
     * @param {string} chapterId  章节id
     * @returns {Object}
     */
    getChild(chapterId) {
        if (this.getChildren().length > 0) {
            return this.getChildren().find(chapter => chapter.getId() === chapterId);
        }
        return undefined;
    }


    /**
     * 根据chapterId删除指定章节
     * @returns {Undefined}
     */
    deleteChapter() {
        const chapterId = this.getId();
        native.deleteChapter(chapterId);
    }

    /**
     * 判断该章节是否为内容节点
     * @returns {boolean}
     */
    getIsContent() {
        return this.isContent;
    }

    /**
     * 判断该章节是否免费
     * @returns {Boolean} false 不免费 true 免费
     */
    getIsFree() {
        return this.isFree;
    }

    /**
     * 获取本章节锁定状态
     * @returns {Number} 1表示锁定，0表示解锁
     */
    getLockState() {
        return this.isLocked;
    }

    /**
     * 获取本章节是否配置了教学计划
     * @returns {Number}1 已配置 ，0 未配置
     */
    getPlan() {
        return this.isPlaned;
    }

    /**
     * 获取本章节的扩展字段
     * @returns {JSON}
     * eg:"{\"knowledgeId\":\"\",\"isSimilar\":0}"
     */
    getExtend() {
        return this.extendParams;
    }

    /**
     * 添加task
     * @param {Task} taskIns
     */
    addTask(task) {
        if (task) {
            this.tasks.push(task);
        }
    }

    /**
     * 去章节学习
     * @param {string} chapterId  章节id
     * @returns {Undefined}
     */
    study() {
        const chapterId = this.getId();
        native.study(chapterId);
    }
}




