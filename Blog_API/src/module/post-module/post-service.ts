import { Injectable } from '@nestjs/common';
import { CommonDb } from 'src/common/CommonDb';
import { PostModel } from '../../models/post-model.dto';

@Injectable()
export class PostService {
  async newPost(post: PostModel) {
    const maPost = post.slug.split('-').reverse()[0];
    const query = `insert into post(id_user, title, slug, body, tag, ma_post, is_public, image) values(5, '${
      post.title
    }', '${post.slug.toString()}', $$${post.body}$$, '${
      post.tag
    }',  '${maPost}', ${post.is_public}, '${post.image}');`;

    var dt = await CommonDb.SaveData(query);

    return dt;
  }

  async listDSPost() {
    const query = `select nd.display_name ,p.* from post as p
    inner join nguoi_dung as nd on p.id_user = nd.id_user
    where p.is_public = 1
    ORDER BY p.created_at DESC;`;

    var dt = await CommonDb.GetData(query);
    return dt;
  }

  async getPostById(id: string) {
    const query = `select nd.display_name publisher,p.* from post as p
    inner join nguoi_dung as nd on p.id_user = nd.id_user
    where p.ma_post = '${id}';`;

    console.log(query);

    var dt = await CommonDb.GetData(query);
    return dt;
  }

  async updatePostById(req: any) {
    const query = `UPDATE post
    SET title = '${req.title}',
      body = $$${req.body}$$,
      is_public = ${req.is_public},
      image = '${req.image}'
    WHERE id_post = '${req.id_post}'`;

    console.log(query);

    var dt = await CommonDb.SaveData(query);
    return dt;
  }

  async deletePostById(id: any) {
    const query = `DELETE FROM post p
    where p.id_post = ${id}`;

    console.log(query);

    var dt = await CommonDb.SaveData(query);
    return dt;
  }
}
