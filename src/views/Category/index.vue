<template>
    <div>分类</div>
</template>

<script setup lang="ts">
onMounted(() => {
    const socket = new WebSocket('ws://121.40.165.18:8800')

    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!')
    })

    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data)
        socket.send('123123123')
    })

    setInterval((_) => {
        socket.send('123123123')
    }, 10000)
})
</script>

<style lang="scss" scoped></style>
