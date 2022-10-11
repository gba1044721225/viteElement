<template>
    <div class="my-article">
        <el-card v-for="i in 4" :key="i">
            <div class="top">
                <span>Rain</span>
                <el-divider direction="vertical" />
                <span>Home</span>
                <el-divider direction="vertical" />
                <span>Grass</span>
            </div>
            <div class="title">10月更文诚意加码，激发写作潜力｜掘金·日新计划</div>
            <div class="content">
                硕果累累，才算不辜负这金秋十月~在掘金发布技术文章，参加10月更文闯关挑战，多重大奖拿到手软！即刻开启技术国度的晋级打怪之路吧！
            </div>
            <div class="footer">
                <div class="item">
                    <img src="@/assets/article/see.png" alt="" />
                    <span>100</span>
                </div>
                <div class="item">
                    <img src="@/assets/article/like.png" alt="" />
                    <span>20</span>
                </div>
                <div class="item">
                    <img src="@/assets/article/reply.png" alt="" />
                    <span>3</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="MyArticle"></script>

<style lang="scss" scoped>
.my-article {
    .top {
        span:hover {
            color: $prefecture-card-title-color;
        }
    }
    .title {
        margin-top: 20px;
        font-weight: 700;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .content {
        margin-top: 20px;
        font-weight: 400;
        font-size: 13px;
        color: #86909c;

        overflow: hidden;
        text-overflow: ellipsis; /* 超出部分省略号 */
        word-break: break-all; /* break-all(允许在单词内换行。) */
        display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
        -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
        -webkit-line-clamp: 2; /* 显示的行数 */
    }
    .footer {
        margin-top: 20px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .item {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            margin-right: 18px;
            img {
                width: 20px;
                height: 20px;
                transition: 1s all ease;
            }
            span {
                color: #8a8a8a;
                margin-left: 5px;
                transition: 1s all ease;
            }
        }
        .item:hover {
            img {
                transform: scale(1.05);
            }
            span {
                transform: scale(1.05);
            }
        }
    }
    :deep(.el-card) {
        margin-bottom: 12px;
        cursor: pointer;
    }
    :deep(.el-card:hover) {
        box-shadow: 0px 0px 12px 2px $prefecture-card-title-color;
    }
}
</style>
