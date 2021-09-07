import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import {sqlContent} from "@/utils/sql";


let a = 'CREATE TABLE `my_user`\n' +
  '(\n' +
  '    `id`            bigint(20) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,\n' +
  '    `username`       varchar(255)          NOT NULL COMMENT \'username\',\n' +
  '    `password`   varchar(255)        NOT NULL COMMENT \'password\'\n' +
  ') ENGINE = InnoDB\n' +
  '  DEFAULT CHARSET = utf8mb4;'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: {msg}
    })
    console.log(sqlContent(a))
    expect(wrapper.text()).to.include(msg)
  })
})
