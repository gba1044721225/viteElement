<template>
    <div class="article">
        <img src="@/assets/testimg/6.jpeg" alt="" />
        <div class="content">
            <div class="first-line">
                <div class="title">新手自学UI设计，这几点是你必须要清楚的！</div>
                <div class="time">
                    <el-icon><Clock /></el-icon>
                    <span>07-07 12:00</span>
                </div>
            </div>
            <div class="second-line">
                <span
                    >UI只是一个简称，全称是User Interface
                    即用户界面设计，指的是对于所有软件的界面美观、操作逻辑、人机交互的整体设计。或许对于现在市场上很多UI设计师来说
                </span>
            </div>
            <div class="third-line">
                <div class="left">
                    <el-icon><User /></el-icon>
                    <span>小黑黑</span>
                    <span>设计教程</span>
                </div>

                <div class="right">
                    <div class="icon-font">
                        <img src="@/assets/testimg/like.png" alt="" />
                        <span>7777</span>
                    </div>
                    <div class="icon-font">
                        <img src="@/assets/testimg/reply.png" alt="" />
                        <span>5555</span>
                    </div>
                    <div class="icon-font">
                        <img src="@/assets/testimg/eye.png" alt="" />
                        <span>3333</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.article {
    display: flex;
    img {
        width: 250px;
        height: 250px;
        margin-right: 15px;
    }
    .content {
        overflow: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // box-sizing: border-box;
        // padding-left: $prefecture-card-margin;

        .first-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .title {
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .time {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.5);
                font-weight: bold;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                align-items: center;
                white-space: nowrap;
                span {
                    margin-left: 2px;
                    width: 150px;
                }
            }
        }
        .second-line {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.5);
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            word-break: break-all;
        }
        .third-line {
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                align-items: center;
                color: rgba(0, 0, 0, 0.5);
                span {
                    margin-left: 10px;
                }
            }
            .right {
                display: flex;
                align-items: center;
                .icon-font {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 5px;
                    }
                    span:nth-child(n-2) {
                        margin-right: 15px;
                    }
                    span {
                        margin-left: 0;
                        color: rgba(0, 0, 0, 0.5);
                        font-weight: bold;
                    }
                }
            }
        }
    }

    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
    .content::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: #f5f5f5;
    }
    /*定义滚动条轨道 内阴影+圆角*/
    .content::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    /*定义滑块 内阴影+圆角*/
    .content::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: $prefecture-card-title-color;
    }
}
</style>
