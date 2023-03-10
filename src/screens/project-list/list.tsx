import React from 'react'
import { Dropdown, Popover, Table } from 'antd'
import { IProject, IProjectList } from '../../types/project'
import { IUser } from '../../types/user'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { Pin } from '../../components/common/pin'
import {
  useEditProject,
  useProjectModel
} from '../../shared/hooks/use-projects'
import { LinkButton } from '../../components/common/lib'
import type { MenuProps } from 'antd'
import styled from '@emotion/styled'
interface IPropsType {
  list: IProjectList
  users: IUser[]
  loading: boolean
}

export const ListScreen = (props: IPropsType) => {
  const { list, users, loading } = props
  const { mutate } = useEditProject()
  const { open, edit } = useProjectModel()

  const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: 'edit',
      onClick: (item) => {
        console.log('item', item)
        edit(item.id)
      }
    },
    {
      label: '删除',
      key: 'delet',
      onClick: () => open()
    }
  ]
  const columns: ColumnsType<IProject> = [
    {
      title: <Pin checked={true} disabled={true}></Pin>,
      render: (_, project) => {
        return (
          <Pin
            checked={project.pin}
            onCheckedChange={(pin) => mutate({ id: project.id, pin })}
          ></Pin>
        )
      }
    },
    // {
    //   title: 'id',
    //   dataIndex: 'id'
    // },
    {
      title: '名称',
      render: (_, project) => {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      render: (_, project) => {
        const res = users.find((user) => user.id === Number(project.personId))
        return res?.name
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created'
    },
    {
      render(_, project) {
        const contentStyle = {
          width: '8rem',
          textAlign: 'center'
        }
        const content = (
          <ContentContainer>
            <LinkButton onClick={() => edit(project.id)}>编辑</LinkButton>
            <LinkButton onClick={() => open()}>删除</LinkButton>
          </ContentContainer>
        )

        // return (
        //   <Dropdown menu={{ items }}>
        //     <LinkButton>...</LinkButton>
        //   </Dropdown>
        // )
        return (
          <Popover content={content} placement="bottom" showArrow={false}>
            <LinkButton>...</LinkButton>
          </Popover>
        )
      }
    }
  ]
  return (
    <Table
      className="list"
      rowKey="id"
      pagination={false}
      columns={columns}
      dataSource={list}
      loading={loading}
    ></Table>
  )
}

const ContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
`
