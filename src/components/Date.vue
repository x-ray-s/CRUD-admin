<template>
    <div class="relative my-3">
        <input type="hidden" name="date" ref="date" />
        <input
            type="text"
            readonly
            @click.stop="show = !show"
            class="w-full input input-bordered"
            placeholder="Select date"
            :value="datepickerValue"
        />

        <div class="absolute right-4 top-1/2 -translate-y-2/4">
            <svg
                class="h-5 w-5 black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        </div>
        <div
            class="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
            style="width: 17rem"
            v-show="show"
            @click.stop
        >
            <div class="flex justify-between items-center mb-2">
                <div>
                    <span class="text-lg font-bold text-gray-800">{{
                        MONTH_NAMES[month]
                    }}</span>
                    <span class="ml-1 text-lg text-gray-600 font-normal">{{
                        year
                    }}</span>
                </div>
                <div>
                    <button
                        type="button"
                        class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                        :class="{
                            'cursor-not-allowed opacity-25': month == 0,
                        }"
                        :disabled="month == 0 ? true : false"
                        @click="
                            () => {
                                month--
                                getNoOfDays()
                            }
                        "
                    >
                        <svg
                            class="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                        :class="{
                            'cursor-not-allowed opacity-25': month == 11,
                        }"
                        :disabled="month == 11 ? true : false"
                        @click="
                            () => {
                                month++
                                getNoOfDays()
                            }
                        "
                    >
                        <svg
                            class="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex flex-wrap mb-3 -mx-1">
                <div
                    style="width: 14.26%"
                    class="px-1"
                    v-for="(day, index) in DAYS"
                    :key="index"
                >
                    <div class="text-gray-800 font-medium text-center text-xs">
                        {{ day }}
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap -mx-1">
                <div
                    v-for="blankday in blankdays"
                    :key="blankday"
                    style="width: 14.28%"
                    class="text-center border p-1 border-transparent text-sm"
                ></div>

                <div
                    :key="dateIndex"
                    v-for="(date, dateIndex) in no_of_days"
                    style="width: 14.28%"
                    class="px-1 mb-1"
                >
                    <div
                        @click="getDateValue(date)"
                        class="cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100"
                        :class="{
                            'bg-blue-500 text-white': isToday(date) == true,
                            'text-gray-700 hover:bg-blue-200':
                                isToday(date) == false,
                        }"
                    >
                        {{ date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            MONTH_NAMES: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            DAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            show: false,
            datepickerValue: '',
            month: '',
            year: '',
            no_of_days: [],
            blankdays: [],
        }
    },

    created() {
        let today = new Date()
        this.month = today.getMonth()
        this.year = today.getFullYear()
        this.datepickerValue = new Date(
            this.year,
            this.month,
            today.getDate()
        ).toDateString()
        this.getNoOfDays()
    },
    mounted() {
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Esc' || e.key === 'Escape') {
                this.show = false
            }
        })
        document.body.addEventListener('click', (e) => {
            this.show = false
        })
    },

    methods: {
        isToday(date) {
            const today = new Date()
            const d = new Date(this.year, this.month, date)

            return today.toDateString() === d.toDateString() ? true : false
        },

        getDateValue(date) {
            let selectedDate = new Date(this.year, this.month, date)
            this.datepickerValue = selectedDate.toDateString()

            this.$refs.date.value =
                selectedDate.getFullYear() +
                '-' +
                ('0' + selectedDate.getMonth()).slice(-2) +
                '-' +
                ('0' + selectedDate.getDate()).slice(-2)

            this.show = false
        },

        getNoOfDays() {
            let daysInMonth = new Date(this.year, this.month + 1, 0).getDate()

            // find where to start calendar day of week
            let dayOfWeek = new Date(this.year, this.month).getDay()
            let blankdaysArray = []
            for (var i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i)
            }

            let daysArray = []
            for (var i = 1; i <= daysInMonth; i++) {
                daysArray.push(i)
            }

            this.blankdays = blankdaysArray
            this.no_of_days = daysArray
        },
    },
}
</script>
