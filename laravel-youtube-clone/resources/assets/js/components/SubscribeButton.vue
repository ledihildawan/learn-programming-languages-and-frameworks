<template>
    <div v-if="subscribers !== null">
        {{ subscribers }} {{ subscribers | pluralize 'subscriber' }} &nbsp;
        <button class="btn btn-xs btn-default" type="button" v-if="canSubscribe" @click.prevent="handle">{{ userSubscribed ? 'Unsubscribe' : 'Subscribe' }}</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                subscribers: null,
                userSubscribed: false,
                canSubscribe: false
            }
        },
        props: {
            channelSlug: null
        },
        methods: {
            getSubscriptionStatus () {
                this.$http.get('/subscription/' + this.channelSlug).then((response) => {
                    this.subscribers = response.json().data.count;
                    this.userSubscribed = response.json().data.user_subscribed;
                    this.canSubscribe = response.json().data.can_subscribe;
                })
            },
            handle () {
                if (this.userSubscribed) {
                    this.unsubscribe();
                } else {
                    this.subscribe();
                }
            },
            subscribe () {
                this.userSubscribed = true;
                this.subscribers++;

                this.$http.post('/subscription/' + this.channelSlug);
            },
            unsubscribe () {
                this.userSubscribed = false;
                this.subscribers--;

                this.$http.delete('/subscription/' + this.channelSlug);
            }
        },
        ready () {
            this.getSubscriptionStatus();
        }
    }
</script>
